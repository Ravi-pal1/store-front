import SignUpForm from "../../components/client/account/SignUpForm.client";
import { gql } from "@shopify/hydrogen";
const SignUp = () => {
  return <SignUpForm />;
};

export default SignUp;

export async function api(request, { queryShop }) {
  const jsonBody = await request.json();
  const { data } = await queryShop({
    query: SIGNUP_MUTATION,
    variables: {
      input: {
        email: jsonBody.email,
        password: jsonBody.password,
        phone: jsonBody.phone,
        firstName: jsonBody.firstName,
        lastName: jsonBody.lastName,
      },
    },
  });
  if (data?.customer?.id) {
    return new Response(null, {
      status: 200,
    });
  }
  console.log(data);
  return new Response(
    JSON.stringify({
      error: data?.customerCreate?.customerUserErrors,
    }),
    { status: 500 }
  );
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
`;
