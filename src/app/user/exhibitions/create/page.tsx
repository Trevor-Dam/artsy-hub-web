'use client' 

import useSWR from 'swr';
import { useState, useEffect, Suspense } from 'react';
import { fetchFromQuery } from '@/routes/api-client';
import NewExhibitionForm from '@/components/ui/new-exhibition-form';
import SelectAllPieceComponent from '@/components/ui/select-all-artpieces-component';

export default function CreateExhibitionPage() {
    return (
        <div>
            <h1 className="text-4xl font-bold mb-8">Create New Exhibition</h1>

                <NewExhibitionForm>
                    <SelectAllPieceComponent />
                </NewExhibitionForm>
        </div>
    )

    
}