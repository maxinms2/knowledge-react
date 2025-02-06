import { Route, Routes } from "react-router-dom"
import { Navbar } from "../components/layout/Navbar"
import { KnowledgeSearch } from "../knowledge/KnowledgeSearch"

export const KnowledgeRoutes=()=>{
    return(
        <>
        <Navbar />
        <Routes>
            <Route path="search" element={<KnowledgeSearch />} />
        </Routes>
    </>
    )
}