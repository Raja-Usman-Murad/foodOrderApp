import React, { useEffect, useState } from "react";
import Card from "../UI/Card";
import classes from "./Avaliablemeals.module.css";
import MealItem from "./MealItem";

const Avaliablemeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();

  const fetchMeals = async () => {
    try {
      const response = await fetch(
        "https://react-http-d8791-default-rtdb.firebaseio.com/meals.json"
      );
      console.log(response);
      if (!response.ok) {
        throw new Error("Something went worng");
      }
      const data = await response.json();
      const loadMeals = [];
      for (const key in data) {
        loadMeals.push({
          id: key,
          name: data[key].name,
          description: data[key].description,
          price: data[key].price,
        });
      }
      setMeals(loadMeals);
      setIsLoading(false);
    } catch (error) {
      console.log("usman", error);
      setIsLoading(false);
      setHttpError(error.message);
    }
  };
  useEffect(() => {
    fetchMeals();
  }, []);

  if (isLoading) {
    return (
      <section className={classes.MealsLoading}>
        <p>loading....</p>
      </section>
    );
  }
  if (httpError) {
    return (
      <section className={classes.MealsError}>
        <p>{httpError}</p>
      </section>
    );
  }
  const mealsList = meals.map((meal) => (
    <MealItem
      id={meal.id}
      key={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));
  return (
    <>
      <section className={classes.meal}>
        <Card>
          <ul>{mealsList}</ul>
        </Card>
      </section>
    </>
  );
};

export default Avaliablemeals;
