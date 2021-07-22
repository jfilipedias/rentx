import { Category } from "../models/Category";

// DTO: Data Transfer Object
interface ICreateCategoryDTO {
  name: string;
  description: string;
}

class CategoriesRepository {
  private categories: Category[];

  constructor() {
    this.categories = [];
  }

  create({ name, description }: ICreateCategoryDTO): void {
    const category = new Category();

    Object.assign(category, {
      name,
      description,
      created_at: new Date(),
    });

    this.categories.push(category);
  }

  findByName(name: string): Category {
    const category = this.categories.find((category) => category.name === name);

    return category;
  }

  list(): Category[] {
    return this.categories;
  }
}

export { CategoriesRepository };
