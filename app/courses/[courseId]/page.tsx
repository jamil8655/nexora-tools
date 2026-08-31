import React from 'react';
import { notFound } from 'next/navigation';
import { COURSES_CATALOG, Course } from '@/lib/courses/courses-data';
import CourseDetailClient from './CourseDetailClient';

export function generateStaticParams() {
  return COURSES_CATALOG.map((c) => ({
    courseId: c.slug,
  }));
}

export default function CourseDetailPage({ params }: { params: { courseId: string } }) {
  const course = COURSES_CATALOG.find((c) => c.slug === params.courseId || c.id === params.courseId);

  if (!course) {
    notFound();
  }

  return <CourseDetailClient course={course} />;
}
