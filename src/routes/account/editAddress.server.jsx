import { gql } from "@shopify/hydrogen";

export async function api(request, { session, queryShop }) {
  if (request.method !== 'POST') {
    return new Response(null, {
      status: 405,
      headers: {
        Allow: 'POST',
      },
    });
  }
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
  if(data?.customerAddressUpdate?.customerAddress){
    return new Response(data, {
      status: 200,
    });
  }
  return new Response(
    JSON.stringify({message:data?.customerAddressUpdate?.customerUserErrors[0]?.message}), {
    status: 400,
  })
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
