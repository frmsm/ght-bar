import pickBy from "lodash-es/pickBy";
import isNumber from "lodash-es/isNumber";
import isEmpty from "lodash-es/isEmpty";

import { FilterSchemaType } from ".";
import { useRouter } from "next/navigation";

export const omitRestEmpty = (value: object) =>
    pickBy(
        value,
        (value) =>
            typeof value === "boolean" || isNumber(value) || !isEmpty(value)
    );

export default function useSubmit(setQuery: any) {
    const router = useRouter();
    const onSubmit = async (values: FilterSchemaType) => {
        //@ts-ignore
        const current = new URLSearchParams(omitRestEmpty(values));
        const search = current.toString();

        const query = search ? `?${search}` : "";

        router.push(query, { scroll: false });
    };

    return onSubmit;
}
