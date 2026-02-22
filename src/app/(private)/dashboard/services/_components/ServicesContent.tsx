import { getAllServices } from "../_data-access/get-all-services";

interface ServiceContentProps {
  userId: string;
}

export async function ServicesContent({ userId }: ServiceContentProps) {
  const services = await getAllServices({ userId });

  console.log("ServicesContent - services:", services);

  return (
    <div>
      <h2>ServicesContent</h2>
      <p>User ID: {userId}</p>
    </div>
  );
}
