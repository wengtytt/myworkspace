import React from "react";

export default function ComponentA(props) {
    const title = "Sample Component A";

    return (
        <div
            styles={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "1rem",
                background: "rgb(56, 193, 252)",
            }}
        >
            <span>{title}</span>
        </div>
    );
}
