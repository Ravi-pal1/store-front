import LoginForm from "../../components/client/LoginForm.client";
import { CacheNone, gql } from '@shopify/hydrogen';

const Login = () => {
  //   const { data } = useShopQuery({
  //       query: QUERY,
  //       variables: {
  //         input: {
  //           firstName: "ravi",
  //           lastName: "Smith",
  //           email: "ravi@gmail.com",
  //           phone: "+15146669852",
  //           password: "5hopif",
  //           acceptsMarketing: true,
  //         },
  //       },
  //     });
  // console.log(data);
    return (
        <>
          <LoginForm/>
        </>
    )
}

export default Login

export async function api(request, { session, queryShop }) {
  if (!session) {
    return new Response('Session storage not available.', {status: 400});
  }
  
  const jsonBody = await request.json();
  if (!jsonBody.email || !jsonBody.password) {
    return new Response(
      JSON.stringify({error: 'Incorrect email or password.'}),
      {status: 400},
    );
  }
  const {data, errors} = await queryShop({
    query: LOGIN_MUTATION,
    variables: {
      input: {
        email: jsonBody.email,
        password: jsonBody.password,
      },
    },
    cache: CacheNone(),
  });

  if (data?.customerAccessTokenCreate?.customerAccessToken?.accessToken) {
    await session.set(
      'customerAccessToken',
      data.customerAccessTokenCreate.customerAccessToken.accessToken,
    );
    return new Response(null, {
      status: 200,
    });
  } else {
    return new Response(
      JSON.stringify({
        error: data?.customerAccessTokenCreate?.customerUserErrors ?? errors,
      }),
      {status: 401},
    );
  }
}

const LOGIN_MUTATION = gql`
  mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
    customerAccessTokenCreate(input: $input) {
      customerUserErrors {
        code
        field
        message
      }
      customerAccessToken {
        accessToken
        expiresAt
      }
    }
  }
`;
// const QUERYTOKEN = gql`
//   mutation customerAccessTokenCreate {
//     customerAccessTokenCreate(
//       input: { email: "ravi@gmail.com", password: "5hopif" }
//     ) {
//       customerAccessToken {
//         accessToken
//       }
//       customerUserErrors {
//         message
//       }
//     }
//   }
// `;
// const QUERY = gql`
//   mutation customerCreate($input: CustomerCreateInput!) {
//     customerCreate(input: $input) {
//       customer {
//         firstName
//         lastName
//         email
//         phone
//         acceptsMarketing
//       }
//       customerUserErrors {
//         field
//         message
//         code
//       }
//     }
//   }
// `;