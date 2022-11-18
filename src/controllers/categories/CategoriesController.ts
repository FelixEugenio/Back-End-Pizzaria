import { Request, Response} from "express";
import { CategoryService } from "../../services/Categories/CategoriesService";

class CategoryController{
async handle(req:Request, res:Response){
    const {name}=req.body;

    const categoryService = new CategoryService();

    const category = await categoryService.execute({
        name

    });

    return res.json(category);

}
}

export {CategoryController}