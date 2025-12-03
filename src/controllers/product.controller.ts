import { NextFunction, Request, Response } from "express";
import { successResponse } from "../common/utils/apiResponse";

export const getAllProductsController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {

        successResponse(
            res,
            200,
            "Get all product",
            {}
        )
    } catch (error) {
        return next(error)
    }
}
export const getProductByIdController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {

        successResponse(
            res,
            200,
            "Get all product",
            {}
        )
    } catch (error) {
        return next(error)
    }
}
export const createProductController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {

        successResponse(
            res,
            200,
            "Get all product",
            {}
        )
    } catch (error) {
        return next(error)
    }
}
export const updateProductController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {

        successResponse(
            res,
            200,
            "Get all product",
            {}
        )
    } catch (error) {
        return next(error)
    }
}
export const deleteProductController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {

        successResponse(
            res,
            200,
            "Get all product",
            {}
        )
    } catch (error) {
        return next(error)
    }
}