"use client";

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const params = useParams();

  // const subdomain = (params?.subdomain as string) || "";

  // const {
  //   data: restaurant,
  //   isLoading,
  //   error,
  //   isError,
  // } = useQuery({
  //   queryKey: ["restaurant", subdomain],
  //   queryFn: () => getRestaurantBySubdomain(subdomain),
  //   enabled: !!subdomain,
  // });

  return <div>{children}</div>;
}
