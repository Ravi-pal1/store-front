import { gql } from "@shopify/hydrogen";

export async function api(request, { session, queryShop }) {
  if (request.method !== "DELETE") {
    return new Response("Delete required to delete address", {
      status: 405,
      headers: {
        Allow: "DELETE",
      },
    });
  }
  const jsonBody = await request.json();
  const { customerAccessToken } = await session.get();
  const { data } = await queryShop({
    query: query,
    variables: {
      customerAccessToken: customerAccessToken,
      id: jsonBody.id,
    },
  });
  if (data) {
    return new Response(data, {
      status: 200,
    });
  }
}

const query = gql`
  mutation customerAddressDelete($customerAccessToken: String!, $id: ID!) {
    customerAddressDelete(customerAccessToken: $customerAccessToken, id: $id) {
      customerUserErrors {
        message
      }
      deletedCustomerAddressId
    }
  }
`;
