import { createRouter } from "next-connect";
import controller from "infra/controller";
import business from "models/business";

const router = createRouter();

router.post(postHandler);

export default router.handler(controller.errorHandlers);

async function postHandler(request, response) {
  const businessInputValues = request.body;
  const newBusiness = await business.create(businessInputValues);
  console.log(request);

  return response.status(201).json(newBusiness);
}
