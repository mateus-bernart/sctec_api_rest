import { createRouter } from "next-connect";
import controller from "infra/http/controller";
import business from "models/business";

const router = createRouter();

router.get(getHandler);
router.delete(deleteHandler);
router.put(putHandler);

export default router.handler(controller.errorHandlers);

async function getHandler(request, response) {
  const businessId = request.query.id;
  const businessFound = await business.findOrFail(businessId);
  return response.status(200).json(businessFound);
}

async function deleteHandler(request, response) {
  const businessId = request.query.id;

  const businessFound = await business.findOrFail(businessId);

  const deletedBusiness = await business.deleteRecord(businessFound.id);

  return response.status(200).json(deletedBusiness);
}

async function putHandler(request, response) {
  const businessInputValues = request.body;
  const businessId = request.query.id;

  await business.findOrFail(businessId);

  const updatedBusiness = await business.update(
    businessInputValues,
    businessId,
  );

  return response.status(200).json(updatedBusiness);
}
