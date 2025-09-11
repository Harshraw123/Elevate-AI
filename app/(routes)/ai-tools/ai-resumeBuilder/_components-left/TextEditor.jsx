

        



import React from "react";
import { Editor } from "primereact/editor";

export default function TextEditor({ value = '', onChange }) {
    return (
        <div className="card">
            <Editor 
                value={value} 
                onTextChange={(e) => onChange && onChange(e.htmlValue)} 
                style={{ height: '320px' }} 
            />
        </div>
    )
}
        
        