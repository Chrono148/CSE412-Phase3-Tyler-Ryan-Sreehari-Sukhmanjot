'use client';

import React, { useState, useEffect } from 'react';
import useSWR from 'swr';
import Link from "next/link";

const fetcher = async (params: Promise<{ id: string }>) =>
  fetch(`https://cse412-backend.ssree.dev/location/${(await params).id}`).then(res => res.json());

const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

// Hardcoded recipe data
const recipes = [
  {
    name: "Fried Rice",
    ingredients: [
      { ingname: "Basmati Rice", ingqty: 2, ingmeasurementtype: "Pounds" },
    ],
  },
  {
    name: "Vegetable Stir-Fry",
    ingredients: [
      { ingname: "Carrot", ingqty: 1, ingmeasurementtype: "Pounds" },
    ],
  },
  {
    name: "Scrambled Eggs with Vegetables",
    ingredients: [
      { ingname: "Eggs", ingqty: 4, ingmeasurementtype: "Dozens" },
    ],
  },
  {
    name: "Corn and Pea Salad",
    ingredients: [
      { ingname: "Corn Cob", ingqty: 2, ingmeasurementtype: "Pounds" },
    ],
  },
  {
    name: "Carrot-Parsley Soup",
    ingredients: [
      { ingname: "Carrot", ingqty: 2, ingmeasurementtype: "Pounds" },
    ],
  },
];

// Helper function to check if a recipe can be made
const canMakeRecipe = (ingredients, recipe) => {
  return recipe.ingredients.every((recipeIngredient) => {
    const locationIngredient = ingredients.find(
      (locIng) => locIng.ingname === recipeIngredient.ingname
    );
    return (
      locationIngredient &&
      locationIngredient.ingqty >= recipeIngredient.ingqty
    );
  });
};

// Helper function to find missing ingredients
const getMissingIngredients = (ingredients, recipe) => {
  return recipe.ingredients
    .filter((recipeIngredient) => {
      const locationIngredient = ingredients.find(
        (locIng) => locIng.ingname === recipeIngredient.ingname
      );
      return !locationIngredient || locationIngredient.ingqty < recipeIngredient.ingqty;
    })
    .map((missingIngredient) => missingIngredient.ingname);
};

const LocationPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const [locname, setLocname] = useState('');
  const [bizcarddata, setbizcarddata] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [selectedDay, setSelectedDay] = useState('Sunday'); // Default day is Sunday
  const [dayEmployees, setDayEmployees] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [availableRecipes, setAvailableRecipes] = useState([]);
  const [unavailableRecipes, setUnavailableRecipes] = useState([]);
  const [locationId, setLocationId] = useState('');


  const fetcher = async () => {
    try {
      const resolvedParams = await params;
      setLocationId(resolvedParams.id);

      const res = await fetch(`https://cse412-backend.ssree.dev/location/${(await params).id}`);
      const data = await res.json();
      setLocname(data.name);

      const biz_res = await fetch(`http://localhost:6969/businesscontact/${(await params).id}`);
      const biz_data = await biz_res.json();
      setbizcarddata(biz_data);

      const empRes = await fetch(`http://localhost:6969/employeelist/${(await params).id}`);
      const empData = await empRes.json();
      setEmployees(empData);

      const locnum = (await params).id;
      const ingredientRes = await fetch(`http://localhost:6969/ingredient/${locnum}`);
      const ingredientData = await ingredientRes.json();
      setIngredients(ingredientData);

      const possibleRecipes = recipes.filter((recipe) =>
        canMakeRecipe(ingredientData, recipe)
      );
      const impossibleRecipes = recipes.filter((recipe) => {
        return !canMakeRecipe(ingredientData, recipe);
      });

      setAvailableRecipes(possibleRecipes);
      setUnavailableRecipes(impossibleRecipes);

      // Fetch employees working on the default selected day
      fetchDayEmployees('Sunday');
    } catch (err) {
      console.error('Error fetching data:', err);
    }
  };

  const fetchDayEmployees = async (day: string) => {
    try {
      const res = await fetch(`http://localhost:6969/employee/${(await params).id}/${day}`);
      const data = await res.json();
      setDayEmployees(data);
    } catch (err) {
      console.error('Error fetching employees for the day:', err);
      setDayEmployees([]);
    }
  };

  const handleDayChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedDay = event.target.value;
    setSelectedDay(selectedDay);
    fetchDayEmployees(selectedDay);
  };

  useEffect(() => {
    fetcher();
  }, []);

  return (
    <>
      <h2 className="text-center">{locname}</h2>
      <div className="sections">Location Contact:</div>
      <div className="content">
        <div className="businessCard">
          <ul>
            <li>First Name: <div id="BCfname">{bizcarddata?.fname || ''}</div></li>
            <li>Last Name: <div id="BClname">{bizcarddata?.lname || ''}</div></li>
            <li>Email Address: <a id="BCemail">{bizcarddata?.email || ''}</a></li>
            <li>Website: <a id="BCwebsite">{bizcarddata?.website || ''}</a></li>
            <li>Phone Number: <div id="BCpnum">{bizcarddata?.phone || ''}</div></li>
          </ul>
        </div>
      </div>

      <div className="sections">Employees:</div>
      <div className="content">
        <div className="employeeInfo">
          {employees.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>First name</th>
                  <th>Last name</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((employee, index) => (
                  <tr key={index}>
                    <td>{employee.empfname}</td>
                    <td>{employee.emplname}</td>
                    <td>
                      <a href={`mailto:${employee.email || ''}`}>
                        {employee.email || 'N/A'}
                      </a>
                    </td>
                    <td><Link href={{ pathname: `/employee/${employee.empnum}` }}>Schedule</Link></td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (<p>No employees listed.</p>)}
        </div>
      </div>

      <div className="sections">Employee selector:</div>
      <div className="content">
        <div className="day-selector">
          <label htmlFor="dayDropdown">Select a day:</label>
          <select id="dayDropdown" value={selectedDay} onChange={handleDayChange}>
            {daysOfWeek.map((day) => (
              <option key={day} value={day}>
                {day}
              </option>
            ))}
          </select>
        </div>
        <div className="employeeList">
          <h3>Employees working on {selectedDay}:</h3>
          {dayEmployees.length > 0 ? (
            <ul>
              {dayEmployees.map((employee, index) => (
                <li key={index}>
                  {employee.empfname} {employee.emplname}
                </li>
              ))}
            </ul>
          ) : (
            <p>No employees scheduled for this day.</p>
          )}
        </div>
      </div>

      <div className="sections">Available Recipes:</div>
      <div className="content">
        <h3>Recipes You Can Make:</h3>
        {availableRecipes.length > 0 ? (
          <ul>
            {availableRecipes.map((recipe, index) => (
              <li key={index}>{recipe.name}</li>
            ))}
          </ul>
        ) : (
          <p>No recipes can be made with the current ingredients.</p>
        )}
      </div>

      <div className="sections">Unavailable Recipes:</div>
      <div className="content">
        <h3>Recipes You Cannot Make:</h3>
        {unavailableRecipes.length > 0 ? (
          <ul>
            {unavailableRecipes.map((recipe, index) => (
              <li key={index}>
                {recipe.name} - Missing Ingredients:
                <ul>
                  {getMissingIngredients(ingredients, recipe).map((ingredient, idx) => (
                    <li key={idx}>{ingredient}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        ) : (
          <p>All recipes can be made with the current ingredients.</p>
        )}
      </div>

      {/* Add Button to Go to Order Page */}
      <div className="content">
  <Link href={`/order/${locationId}`} passHref>
    <button className="order-button">Order More Ingredients</button>
  </Link>
      </div>
    </>
  );
};

export default LocationPage;
