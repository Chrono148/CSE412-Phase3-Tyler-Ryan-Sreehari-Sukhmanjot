'use client';

import React, { useState, useEffect } from 'react';
import useSWR from 'swr';
import Link from "next/link";

const businesscontactFetcher = async (params: [Promise<{ id: string }>, any]) =>
  fetch(`https://cse412-backend.ssree.dev/businesscontact/${(await params[0]).id}`).then(res => res.json());
const locationFetcher = async (params: [Promise<{ id: string }>, any]) => fetch(`https://cse412-backend.ssree.dev/location/${(await params[0]).id}`).then(res => res.json());
const employeesFetcher = async (params: [Promise<{ id: string }>, any]) =>
  fetch(`https://cse412-backend.ssree.dev/employeelist/${(await params[0]).id}`).then(res => res.json());
const ingredientsFetcher = async (params: [Promise<{ id: string }>, any]) =>
  fetch(`https://cse412-backend.ssree.dev/ingredient/${(await params[0]).id}`).then(res => res.json());
const allemployeesFetcher = async (params: [Promise<{ id: string }>, any]) =>
  fetch(`https://cse412-backend.ssree.dev/employee/${(await params[0]).id}/all`).then(res => res.json());

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
  const [selectedDay, setSelectedDay] = useState('Sunday'); // Default day is Sunday

  const { data: location, error: locationError, isLoading: locationLoading } = useSWR(
    [params, "location"],
    locationFetcher
  );

  const { data: businesscontact, error: businesscontactError, isLoading: businesscontactLoading } = useSWR(
    [params, "businesscontact"],
    businesscontactFetcher
  );

  const { data: employeelist, error: emplistError, isLoading: emplistLoading } = useSWR(
    [params, "employeelist"],
    employeesFetcher
  );

  const { data: ingredients, error: ingredientsError, isLoading: ingredientsLoading } = useSWR(
    [params, "ingredients"],
    ingredientsFetcher
  );
  const { data: allemployees, error: allemployeesError, isLoading: allemployeesLoading } = useSWR(
    [params, "allemployees"],
    allemployeesFetcher
  );
  const loading = locationLoading || businesscontactLoading || emplistLoading || ingredientsLoading || allemployeesLoading;
  const the_errors = locationError || businesscontactError || emplistError || ingredientsError || allemployeesError;
  if (loading) return <div>Loading...</div>;
  if (the_errors) return <div>Failed to load!</div>;

  const possibleRecipes = recipes.filter((recipe) =>
    canMakeRecipe(ingredients, recipe)
  );
  const impossibleRecipes = recipes.filter((recipe) => {
    return !canMakeRecipe(ingredients, recipe);
  });
  


  const handleDayChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedDay = event.target.value;
    setSelectedDay(selectedDay);
  };

  const filteredAllEmployees = allemployees.filter(emp => emp.schday == selectedDay);
  return (
    <>
      <h2 className="text-center">{location.name}</h2>
      <div className="sections">Location Contact:</div>
      <div className="content">
        <div className="businessCard">
          <ul>
            <li>First Name: <div id="BCfname">{businesscontact?.fname || ''}</div></li>
            <li>Last Name: <div id="BClname">{businesscontact?.lname || ''}</div></li>
            <li>Email Address: <a id="BCemail">{businesscontact?.email || ''}</a></li>
            <li>Website: <a id="BCwebsite">{businesscontact?.website || ''}</a></li>
            <li>Phone Number: <div id="BCpnum">{businesscontact?.phone || ''}</div></li>
          </ul>
        </div>
      </div>

      <div className="sections">Employees:</div>
      <div className="content">
        <div className="employeeInfo">
          {employeelist.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>First name</th>
                  <th>Last name</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                {employeelist.map((employee, index) => (
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
          {filteredAllEmployees.length > 0 ? (
            <ul>
              {filteredAllEmployees.map((employee, index) => (
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
        {possibleRecipes.length > 0 ? (
          <ul>
            {possibleRecipes.map((recipe, index) => (
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
        {impossibleRecipes.length > 0 ? (
          <ul>
            {impossibleRecipes.map((recipe, index) => (
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
  <Link href={`/order/${location.num}`} passHref>
    <button className="order-button">Order More Ingredients</button>
  </Link>
      </div>
    </>
  );
};

export default LocationPage;
