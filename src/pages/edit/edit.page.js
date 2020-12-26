import React from "react";

export default function EditExpensePage(props) {
    console.log(props)
    return (
        <div>
              THis is from my edit component and the ID {props.match.params.id}
        </div>
    )
}
