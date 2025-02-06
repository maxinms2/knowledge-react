import { Route, Routes } from "react-router-dom"
import { Navbar } from "../components/layout/Navbar"
import { KnowledgeSearch } from "../knowledge/KnowledgeSearch"
import { KnowledgeTree } from "../knowledge/KnowledgeTree"

export const KnowledgeRoutes=()=>{
    return(
        <>
        <Navbar />
        <Routes>
            <Route path="search" element={<KnowledgeSearch />} />
            <Route path="tree" element={<KnowledgeTree />} />
        </Routes>
    </>
    )
}