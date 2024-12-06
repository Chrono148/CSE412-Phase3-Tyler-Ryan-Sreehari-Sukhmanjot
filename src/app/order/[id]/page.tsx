'use client';

import React, { useState, useEffect } from 'react';

const OrdersPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const [suppliers, setSuppliers] = useState([]);
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [ingredients, setIngredients] = useState([]);
  const [_locnum, setlocnum] = useState("");

  const fetchSuppliersAndIngredients = async () => {
    try {
      // Fetch suppliers
      const suppliersRes = await fetch('http://localhost:6969/businesscontact/suppliers');
      const suppliersData = await suppliersRes.json();
      setSuppliers(suppliersData);

      const resolvedParams = await params;
      setlocnum(resolvedParams.id);


      // Set available ingredients
      const ingData = [
        { name: 'Carrot', ingnum: 1 },
        { name: 'Basmati Rice', ingnum: 2 },
        { name: 'Green Peas', ingnum: 3 },
        { name: 'Garlic', ingnum: 4 },
        { name: 'Onion', ingnum: 5 },
        { name: 'Eggs', ingnum: 6 },
        { name: 'Corn Cob', ingnum: 7 },
        { name: 'Salt Container', ingnum: 8 },
        { name: 'Soy Sauce Bottle', ingnum: 9 },
        { name: 'Parsley', ingnum: 10 },
      ];
      setIngredients(ingData);
    } catch (err) {
      console.error('Error fetching data:', err);
    }
  };

  const handleOrder = async (supnum: number) => {
    try {
      // Construct the ingredients list to send
      const orderedIngredients = ingredients
        .filter(ingredient => selectedIngredients.includes(ingredient.name))
        .map(ingredient => ingredient.ingnum)
        .join(',');

      if (!orderedIngredients) {
        alert('No ingredients selected.');
        return;
      }

      const response = await fetch(`http://localhost:6969/order/${_locnum}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ingredients: orderedIngredients, supnum }),
      });

      if (!response.ok) {
        throw new Error('Failed to place order');
      }

      alert('Order placed successfully!');
      setSelectedIngredients([]); // Reset selected ingredients after successful order
    } catch (err) {
      console.error('Error placing order:', err);
      alert('Failed to place order.');
    }
  };

  useEffect(() => {
    fetchSuppliersAndIngredients();
  }, []);

  return (
    <>
      <h2 className="text-center">Supplier Contact Information</h2>
      <div className="suppliers-container">
        {suppliers.map(supplier => (
          <div key={supplier.supnum} className="businessCard supplier-card">
            <p className="employeeInfo"><strong>Name:</strong> {supplier.fname} {supplier.lname}</p>
            <p className="employeeInfo"><strong>Email:</strong> {supplier.email}</p>
            <p className="employeeInfo">
              <strong>Website:</strong>
              <a href={supplier.website} target="_blank" rel="noopener noreferrer">{supplier.website}</a>
            </p>
            <p className="employeeInfo"><strong>Phone:</strong> {supplier.phone}</p>
            <div className="content order-section">
              <h4>Select Ingredients:</h4>
              <ul>
                {ingredients.map(ingredient => (
                  <li key={ingredient.ingnum} className="informationRow ingredient-option">
                    <label>
                      <input
                        type="checkbox"
                        value={ingredient.name}
                        checked={selectedIngredients.includes(ingredient.name)}
                        onChange={() => {
                          setSelectedIngredients(prev =>
                            prev.includes(ingredient.name)
                              ? prev.filter(item => item !== ingredient.name)
                              : [...prev, ingredient.name]
                          );
                        }}
                      />
                      {ingredient.name}
                    </label>
                  </li>
                ))}
              </ul>
              <button
                className="delete-button order-button"
                onClick={() => handleOrder(supplier.supnum)}
              >
                Place Order
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default OrdersPage;
