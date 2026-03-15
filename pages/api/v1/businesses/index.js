import { createRouter } from "next-connect";
import controller from "infra/http/controller";
import business from "models/business";

const router = createRouter();

router.post(postHandler);
router.get(getHandler);

export default router.handler(controller.errorHandlers);

async function postHandler(request, response) {
  const businessInputValues = request.body;
  const newBusiness = await business.create(businessInputValues);
  return response.status(201).json(newBusiness);
}

async function getHandler(request, response) {
  const businesses = await business.getAll();
  return response.status(200).json(businesses);
}
