/* eslint-disable react/prop-types */
export default function Meal({ data, name }) {
    return (
        <div>
            {name}
            {data.protein}
        </div>
    )
}