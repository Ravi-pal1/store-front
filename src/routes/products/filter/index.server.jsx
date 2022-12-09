import Filter from "../../../components/client/Filters.client"
import { Layout } from "../../../components/server/Layout.server"

const Index = () => {
  return (
    <Layout>
      <section className="w-full gap-4 md:gap-8 grid p-6 md:p-8 lg:p-12">
        <Filter/>
      </section>
    </Layout>
  )
}

export default Index