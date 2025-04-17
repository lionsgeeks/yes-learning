import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import Comment from './comment';
import { useState } from 'react';

const Forum = ({ comments }) => {
    const [newComment, setNewComment] = useState('');

    const handleSubmitComment = (e) => {
        e.preventDefault();
        // In a real app, you would send this to your API
        // console.log('Submitting comment:', newComment);
        setNewComment('');
        // Then you would add the new comment to the list
    };
    // console.log(comments);
    return (
        <div className="space-y-6">
            <form onSubmit={handleSubmitComment} className="space-y-3">
                <h3 className="font-medium">Join the Discussion</h3>
                <textarea
                    className="min-h-[100px] w-full rounded-md border p-3"
                    placeholder="Share your thoughts or ask a question..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                ></textarea>
                <div className="flex justify-end">
                    <Button type="submit" disabled={!newComment.trim()}>
                        Post Comment
                    </Button>
                </div>
            </form>

            <Separator />

            <div className="space-y-6">
                <h3 className="font-medium">{comments.length} Comments</h3>
                <div className="flex flex-col gap-3">
                    {comments.map((comment, idx) => (
                        <Comment comment={comment} key={idx} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Forum;
