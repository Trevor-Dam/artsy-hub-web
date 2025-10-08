'Use client';
import React, { useEffect } from "react";
import { useState } from "react";

export default function NewExhibitionForm({ children }: { children: React.ReactNode }) {
    const [categories, setCategories] = useState('');
    
    return (
        <div>
            <h1>Create New Exhibition</h1>
            <form method="post" action="/api/admin/create-exhibition">
                <label>
                    Exhibition Name:
                    <input type="text" name="name" required />
                </label>    
                <br />
                <label>
                    Start Date:
                    <input type="datetime-local" name="startDate" required />
                </label>
                <br />
                <label>
                    End Date:
                    <input type="datetime-local" name="endDate" required />
                </label>
                <br />
                <label>
                    Capacity:
                    <input type="number" name="capacity" required />
                </label>
                <br />
                <label>
                    Category:
                    <input type="text" name="category"  onChange={(e) => setCategories(e.target.value)} 
                    required />
                </label>
                <br />
                <label>
                    Art Pieces:
                    {children}
                </label>
                <br />
                <button type="submit">Create Exhibition</button>
            </form>
        </div>
    )
}