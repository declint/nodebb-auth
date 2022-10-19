import create from 'zustand'

const usePageDataStore = create(set => ({
    pagedata : "Data store initialized",
    userid: 0,
}))

export {usePageDataStore}


