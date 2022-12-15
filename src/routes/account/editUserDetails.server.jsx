import { gql } from '@shopify/hydrogen'

export async function api(request, {session, queryShop}) {
  const jsonBody = await request.json();
  const {customerAccessToken} = await session.get()
  const { data } = await queryShop({
    query: Query,
    variables: {
      customerAccessToken: customerAccessToken,
      customer: jsonBody
    }
  });
  console.log(data);
  return new Response(data,{
      status: 200
    }
  )
}
const Query = gql `
  mutation customerUpdate($customer: CustomerUpdateInput!, $customerAccessToken: String!) {
    customerUpdate(
        customer: $customer, 
        customerAccessToken: $customerAccessToken
    ) {
      customer {
        firstName
        lastName
        phone
        email
      }
      customerUserErrors {
        message
      }
    }
  }
` 