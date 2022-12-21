import SignUpForm from "../../components/client/account/SignUpForm.client"
import { gql } from '@shopify/hydrogen'
const SignUp = () => {
  return (
    <SignUpForm/>
  )
}

export default SignUp

export async function api(request, { queryShop }) {
    const jsonBody = await request.json();
    console.log(jsonBody);
    const { data } = await queryShop({
      query: SIGNUP_MUTATION,
      variables: {
        input:{
            email: jsonBody.email,
            password: jsonBody.password,
            phone: jsonBody.phone,
            firstName: jsonBody.firstName,
            lastName: jsonBody.lastName
        },
      }
    });
    console.log(data);
    if (data?.customer?.id) {
      return new Response(null, {
        status: 200,
      });
    }
    return new Response(null, {
      status: 500,
    })
}
const SIGNUP_MUTATION = gql`
    mutation customerCreate($input: CustomerCreateInput!) {
        customerCreate(input: $input) {
        customer {
            firstName
            lastName
            email
            phone
            acceptsMarketing
        }
        customerUserErrors {
            field
            message
            code
        }
        }
    }
`   