import { usePage } from '@inertiajs/react';

const ChapterPreview = () => {
    const { chapter } = usePage().props;
    console.log(chapter);
    return (
        <div>
            <CoursePreview course={chapter} />
        </div>
    );
};

export default ChapterPreview;
<CoursePreview />;
