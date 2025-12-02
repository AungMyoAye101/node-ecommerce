import { Router } from "express";
import { validateRequestBody, validateRequestParams } from "../middlewares/validation.middleware";
import { addressSchmea, addressUpdateSchmea } from "../validations/address.schema";
import { addressCreateControl, addressDeleteControl, addressUpdateControl, getAddressByUserIdControl } from "../controllers/address.controller";
import { IDSchmea } from "../validations/auth.schema";


const router = Router();

router.get(
    '/:id',
    validateRequestParams(IDSchmea),
    getAddressByUserIdControl
);
router.post(
    '/create',
    validateRequestBody(addressSchmea),
    addressCreateControl
)
router.put('/:id/update',
    validateRequestParams(IDSchmea),
    validateRequestBody(addressUpdateSchmea),
    addressUpdateControl
);
router.delete(
    '/:id',
    validateRequestParams(IDSchmea),
    addressDeleteControl
);

export default router;
