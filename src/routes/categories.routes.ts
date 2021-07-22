import { Router } from "express";

import { CatetegoriesRepository } from "../repositories/CategoriesRepository";

const categoriesRoutes = Router();
const categoriesRepository = new CatetegoriesRepository();

categoriesRoutes.post("/", (request, response) => {
  const { name, description } = request.body;
  categoriesRepository.create({ name, description });

  return response.status(201).send();
});

categoriesRoutes.get("/", (request, response) => {
  const categories = categoriesRepository.list();

  return response.status(200).json({ categories });
});

export { categoriesRoutes };
