import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "./queryKey";

export const PAGE_SIZE = 10;

interface IUser {
    id: number;
    name: string;
    email: string;
}

export const useFetchUser = (currentPage: number) => {
    const queryInfo = useQuery({
        queryKey: QUERY_KEY.getUserPaginate(currentPage),
        queryFn: async (): Promise<any> =>
            fetch(`http://localhost:8000/users?_page=${currentPage}&_limit=${PAGE_SIZE}`).then(
                async (res) => {
                    const total_items = +(res.headers.get('X-Total-Count') ?? 0);
                    const total_pages = Math.ceil(total_items / PAGE_SIZE);
                    const d = await res.json();
                    return {
                        total_items, total_pages, users: d
                    }
                },
            ),
        placeholderData: keepPreviousData,
    })
    return {
        ...queryInfo,
        data: queryInfo?.data?.users ?? [],
        count: queryInfo?.data?.total_items ?? 0,
        totalPages: queryInfo?.data?.total_pages ?? 0,
    }
}