export function apiFetch<T>(
  route: string,
  options: RequestInit = {}
): Promise<T> {
  const defaultOptions: RequestInit = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    next: {
      revalidate: 60,
    },
  };

  const mergedOptions: RequestInit = {
    ...defaultOptions,
    ...options,
    next: {
      ...defaultOptions.next,
      ...(options?.next ?? {}),
    },
  };

  return fetch(`${process.env.NEXT_PUBLIC_APP_URL}${route}`, mergedOptions)
    .then((res) => {
      return res.json();
    })
    .catch((err: any) => {
      console.log("fetch failed: ", err.message);

      throw new Error(err?.message ?? "Request failed");
    });
}
