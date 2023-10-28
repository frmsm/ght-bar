import pickBy from "lodash-es/pickBy";
import isNumber from "lodash-es/isNumber";
import isEmpty from "lodash-es/isEmpty";

import { FilterSchemaType } from ".";

export const omitRestEmpty = (value: object) =>
    pickBy(
        value,
        (value) =>
            typeof value === "boolean" || isNumber(value) || !isEmpty(value)
    );

export default function useSubmit(setQuery: any) {
    const onSubmit = async (values: FilterSchemaType) => {
        const current = new URLSearchParams(omitRestEmpty(values));
        const search = current.toString();

        const query = search ? `?${search}` : "";

        window.history.pushState({}, "", query ? query : "/");
        setQuery(query);
    };

    return onSubmit;
}
