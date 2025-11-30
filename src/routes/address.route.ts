import { Router } from "express";
import { validateRequestBody, validateRequestParams } from "../middlewares/validation.middleware";
import { addressSchmea } from "../validations/address,schema";
import { addressCreateControl, addressUpdateControl, getAddressByIdControl, getAllAddressControl } from "../controllers/address.controller";
import { IDSchmea } from "../validations/auth.schema";

const router = Router();

router.get('/', getAllAddressControl);
router.get('/:id', validateRequestParams(IDSchmea), getAddressByIdControl);
router.post('/create', validateRequestBody(addressSchmea), addressCreateControl)
router.put('/update', addressUpdateControl)
