"use client";

import { CircularProgress } from "@heroui/react";

export default function Loading() {
  return <CircularProgress className="absolute left-1/2 top-1/4 -translate-x-1/2" isIndeterminate />
}