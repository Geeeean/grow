/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as authLayoutImport } from './routes/(auth)/_layout'
import { Route as appLayoutImport } from './routes/(app)/_layout'
import { Route as appLayoutIndexImport } from './routes/(app)/_layout.index'
import { Route as authLayoutSigninImport } from './routes/(auth)/_layout.signin'
import { Route as appLayoutHarvestsImport } from './routes/(app)/_layout.harvests'

// Create Virtual Routes

const authImport = createFileRoute('/(auth)')()
const appImport = createFileRoute('/(app)')()

// Create/Update Routes

const authRoute = authImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const appRoute = appImport.update({
  id: '/(app)',
  getParentRoute: () => rootRoute,
} as any)

const authLayoutRoute = authLayoutImport.update({
  id: '/_layout',
  getParentRoute: () => authRoute,
} as any)

const appLayoutRoute = appLayoutImport.update({
  id: '/_layout',
  getParentRoute: () => appRoute,
} as any)

const appLayoutIndexRoute = appLayoutIndexImport.update({
  path: '/',
  getParentRoute: () => appLayoutRoute,
} as any)

const authLayoutSigninRoute = authLayoutSigninImport.update({
  path: '/signin',
  getParentRoute: () => authLayoutRoute,
} as any)

const appLayoutHarvestsRoute = appLayoutHarvestsImport.update({
  path: '/harvests',
  getParentRoute: () => appLayoutRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/(app)': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof appImport
      parentRoute: typeof rootRoute
    }
    '/(app)/_layout': {
      id: '/_layout'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof appLayoutImport
      parentRoute: typeof appRoute
    }
    '/(auth)': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof authImport
      parentRoute: typeof rootRoute
    }
    '/(auth)/_layout': {
      id: '/_layout'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof authLayoutImport
      parentRoute: typeof authRoute
    }
    '/(app)/_layout/harvests': {
      id: '/_layout/harvests'
      path: '/harvests'
      fullPath: '/harvests'
      preLoaderRoute: typeof appLayoutHarvestsImport
      parentRoute: typeof appLayoutImport
    }
    '/(auth)/_layout/signin': {
      id: '/_layout/signin'
      path: '/signin'
      fullPath: '/signin'
      preLoaderRoute: typeof authLayoutSigninImport
      parentRoute: typeof authLayoutImport
    }
    '/(app)/_layout/': {
      id: '/_layout/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof appLayoutIndexImport
      parentRoute: typeof appLayoutImport
    }
  }
}

// Create and export the route tree

interface appLayoutRouteChildren {
  appLayoutHarvestsRoute: typeof appLayoutHarvestsRoute
  appLayoutIndexRoute: typeof appLayoutIndexRoute
}

const appLayoutRouteChildren: appLayoutRouteChildren = {
  appLayoutHarvestsRoute: appLayoutHarvestsRoute,
  appLayoutIndexRoute: appLayoutIndexRoute,
}

const appLayoutRouteWithChildren = appLayoutRoute._addFileChildren(
  appLayoutRouteChildren,
)

interface appRouteChildren {
  appLayoutRoute: typeof appLayoutRouteWithChildren
}

const appRouteChildren: appRouteChildren = {
  appLayoutRoute: appLayoutRouteWithChildren,
}

const appRouteWithChildren = appRoute._addFileChildren(appRouteChildren)

interface authLayoutRouteChildren {
  authLayoutSigninRoute: typeof authLayoutSigninRoute
}

const authLayoutRouteChildren: authLayoutRouteChildren = {
  authLayoutSigninRoute: authLayoutSigninRoute,
}

const authLayoutRouteWithChildren = authLayoutRoute._addFileChildren(
  authLayoutRouteChildren,
)

interface authRouteChildren {
  authLayoutRoute: typeof authLayoutRouteWithChildren
}

const authRouteChildren: authRouteChildren = {
  authLayoutRoute: authLayoutRouteWithChildren,
}

const authRouteWithChildren = authRoute._addFileChildren(authRouteChildren)

export interface FileRoutesByFullPath {
  '/': typeof appLayoutIndexRoute
  '/harvests': typeof appLayoutHarvestsRoute
  '/signin': typeof authLayoutSigninRoute
}

export interface FileRoutesByTo {
  '/': typeof appLayoutIndexRoute
  '/harvests': typeof appLayoutHarvestsRoute
  '/signin': typeof authLayoutSigninRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof authRouteWithChildren
  '/_layout': typeof authLayoutRouteWithChildren
  '/_layout/harvests': typeof appLayoutHarvestsRoute
  '/_layout/signin': typeof authLayoutSigninRoute
  '/_layout/': typeof appLayoutIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '/' | '/harvests' | '/signin'
  fileRoutesByTo: FileRoutesByTo
  to: '/' | '/harvests' | '/signin'
  id:
    | '__root__'
    | '/'
    | '/_layout'
    | '/_layout/harvests'
    | '/_layout/signin'
    | '/_layout/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  appRoute: typeof appRouteWithChildren
  authRoute: typeof authRouteWithChildren
}

const rootRouteChildren: RootRouteChildren = {
  appRoute: appRouteWithChildren,
  authRoute: authRouteWithChildren,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/"
      ]
    },
    "/": {
      "filePath": "(auth)",
      "children": [
        "/_layout"
      ]
    },
    "/_layout": {
      "filePath": "(auth)/_layout.tsx",
      "parent": "/",
      "children": [
        "/_layout/signin"
      ]
    },
    "/_layout/harvests": {
      "filePath": "(app)/_layout.harvests.tsx",
      "parent": "/_layout"
    },
    "/_layout/signin": {
      "filePath": "(auth)/_layout.signin.tsx",
      "parent": "/_layout"
    },
    "/_layout/": {
      "filePath": "(app)/_layout.index.tsx",
      "parent": "/_layout"
    }
  }
}
ROUTE_MANIFEST_END */
