import { gql } from "@shopify/hydrogen";

export async function api(request, { session, queryShop }) {
  const jsonBody = await request.json();
  const { customerAccessToken } = await session.get();
  const { data } = await queryShop({
    query: addressQuery,
    variables: {
      customerAccessToken: customerAccessToken,
      address: jsonBody.formData,
      id: jsonBody.id,
    },
  });
  return new Response(data, {
    status: 200,
  });
}

const addressQuery = gql`
  mutation customerAddressUpdate(
    $address: MailingAddressInput!
    $customerAccessToken: String!
    $id: ID!
  ) {
    customerAddressUpdate(
      address: $address
      customerAccessToken: $customerAccessToken
      id: $id
    ) {
      customerAddress {
        firstName
        lastName
        address1
        address2
        city
        province
        country
      }
      customerUserErrors {
        message
      }
    }
  }
`;
