interface CoursePartBase {
    name: string;
    exerciseCount: number;
    kind: string;
    description?: string;
}

interface CoursePartBasic extends CoursePartBase {
    kind: "basic";
}

interface CoursePartGroup extends CoursePartBase {
    kind: "group";
    groupProjectCount: number;
}

interface CoursePartBackground extends CoursePartBase {
    kind: "background";
    backgroundMaterial: string;
}

interface CoursePartSpecial extends CoursePartBase {
    kind: "special";
    requirements: string[];
}

export type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground | CoursePartSpecial ;