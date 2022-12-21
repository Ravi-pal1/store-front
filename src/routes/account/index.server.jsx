import { useSession } from "@shopify/hydrogen/foundation/useSession/useSession";
import { gql, useShopQuery } from "@shopify/hydrogen";
import { Layout } from "../../components/server/Layout.server";
import UserDetails from "../../components/client/account/UserDetails.client";
import AddressDetails from "../../components/client/account/AddressDetails.client";
import OrderDetails from "../../components/client/account/OrderDetails.client";
import { LogoutButton } from "../../components/client/account/LogOutButton.client";
import AddAddressButton from "../../components/client/account/AddAddressButton.client";

const index = ({ response }) => {
  const { customerAccessToken } = useSession();
  if (!customerAccessToken) return response.redirect("/account/login");
  const {
    data: { customer },
  } = useShopQuery({
    query: QUERY,
    variables: {
      customerAccessToken,
    },
  });
  return (
    <Layout>
      <section className="w-full gap-4 md:gap-8 grid p-6 md:p-8 lg:p-12 bg-slate-50">
        <h2 className="text-3xl font-bold text-gray-900">
          Welcome back, {customer.firstName}
        </h2>
        <OrderDetails customer={customer} />
        {customer && <UserDetails customer={customer} />}
        <div>
          <h2 className="text-xl font-bold  mb-2">Address Book</h2>
          {customer.defaultAddress ? (
            <AddressDetails address={customer?.defaultAddress} />
          ) : (
            <section>
              <div className="space-y-3 bg-white shadow rounded p-6">
                <p className="text-sm">You havn't saved any adresses yet.</p>
                <AddAddressButton />
              </div>
            </section>
          )}
        </div>
        <LogoutButton />
      </section>
    </Layout>
  );
};
export default index;

export async function api(request, { session, queryShop }) {
  const jsonBody = await request.json();
  const { customerAccessToken } = await session.get();
  const { data } = await queryShop({
    query: addressQuery,
    variables: {
      customerAccessToken: customerAccessToken,
      address: {
        ...jsonBody,
      },
    },
  });
  if (data?.customerAddressCreate?.customerAddress?.id) {
    return new Response(data, {
      status: 200,
    });
  }
  return new Response(
    JSON.stringify({
      message: data?.customerAddressCreate?.customerUserErrors[0]?.message,
    }),
    {
      status: 400,
    }
  );
}

const addressQuery = gql`
  mutation customerAddressCreate(
    $customerAccessToken: String!
    $address: MailingAddressInput!
  ) {
    customerAddressCreate(
      customerAccessToken: $customerAccessToken
      address: $address
    ) {
      customerUserErrors {
        code
        field
        message
      }
      customerAddress {
        id
      }
    }
  }
`;

const QUERY = gql`
  query customerAccess($customerAccessToken: String!) {
    customer(customerAccessToken: $customerAccessToken) {
      id
      firstName
      lastName
      phone
      email
      acceptsMarketing
      orders(first: 10) {
        nodes {
          name
          orderNumber
          phone
        }
      }
      defaultAddress {
        id
        firstName
        lastName
        address1
        address2
        city
        province
        country
        zip
        phone
      }
    }
  }
`;
