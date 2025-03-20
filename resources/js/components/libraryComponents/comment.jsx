import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { ThumbsUp } from 'lucide-react';

const Comment = ({ comment }) => {
    console.log(comment)
    return (
        <div className="grid grid-cols-[0.1fr_3fr] justify-start gap-3 rounded p-3">
            <Avatar className="h-8 w-8">
                <AvatarImage src={comment.avatar} alt={comment.user} />
                <AvatarFallback>
                    {comment.user.split(' ')[0][0]}
                    {comment.user.split(' ')[1][0]}{' '}
                </AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-1">
                <p className="font-bold">{comment.user}</p>
                <p>{comment.content}</p>
                <div className="flex items-center gap-3">
                    <div className="mt-2 flex gap-4">
                        <Button variant="ghost" size="sm" className="h-7 px-2 text-xs">
                            <ThumbsUp className="mr-1 h-3.5 w-3.5" />
                            Like ({comment.likes})
                        </Button>
                        {/* <Button variant="ghost" size="sm" className="h-7 px-2 text-xs">
                            <MessageSquare className="mr-1 h-3.5 w-3.5" />
                            Reply
                        </Button> */}
                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <p className="cursor-pointer text-lg font-bold">...</p>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-fit" align="end">
                            <form action="" method="post">
                                <button className="w-full cursor-pointer">Delete</button>
                            </form>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </div>
    );
};

export default Comment;
