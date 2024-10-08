import { getAllCredentialUseCase } from "@/use-cases/credential"
import { getServerSession } from "next-auth"
import CredentialItem from "../../_components/CredentialItem"
import { PropsWithChildren } from "react"
import { CREDENTIAL_CATEGORIES, CREDENTIAL_TYPES } from "@/constants"

type CredentialsPageProps = PropsWithChildren<{
  params: {
    category: string
    type: string
  }
}>


const CredentialsLayout = async ({ params: { category, type }, children }: CredentialsPageProps) => {


  if (!CREDENTIAL_CATEGORIES.includes(category)) throw new Error("Oops! You hit the wrong Route")
  if (!CREDENTIAL_TYPES.includes(type)) throw new Error("Oops! You hit the wrong Route")

  const session = await getServerSession()

  const credentials = await getAllCredentialUseCase(session?.user?.email!, category, type)

  if (!credentials.length) {
    return (
      <section>No Credentials Found</section>
    )
  }

  return (
    <>
      <section className=" flex-grow-0 px-2 py-2 border border-gray-800/40 rounded-md h-full overflow-y-auto">
        {
          credentials.map(credential => <CredentialItem key={credential.id} credential={credential} />)
        }
      </section>
      {children}
    </>
  )
}

export default CredentialsLayout