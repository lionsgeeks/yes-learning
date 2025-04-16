import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Check } from 'lucide-react';

const ChapterDetails = ({ setActiveTab, data, setData, lang }) => {
    const Transtext = (param) => {
        return param[lang]
    }
    console.log("data",data)
    return (
        <>
            <Card dir={lang === 'ar' ? 'rtl' : 'ltr'} className="col-span-5">
                <CardHeader>
                    <CardTitle> {Transtext({en:"Basic Information", ar:"المعلومات الأساسية", fr:"Informations de base"})} </CardTitle>
                    <CardDescription>{Transtext({en:"Enter the main details about your course", ar:"أدخل التفاصيل الرئيسية حول دورتك", fr:"Informations de base"})}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="title">{Transtext({en:'Course Title', ar:'عنوان الدورة', fr:'titre du cours'})}</Label>
                            <Input
                                className="mt-4"
                                id="title"
                                placeholder={Transtext({en:"Enter course title", ar:"	أدخل عنوان الدورة", fr:"Saisissez le titre du cours"})}
                                value={data.title}
                                onChange={(e) => setData((prev) => ({ ...prev, [lang]: { ...prev[lang], title: e.target.value } }))}
                            />
                        </div>
                        <div className="space-y-4">
                            <Label htmlFor="duration">{Transtext({en:'Estimated Duration (Minutes)', ar:'المدة التقديرية', fr:'Durée estimée'})} </Label>
                            <Input
                                className="mt-4"
                                id="duration"
                                type="number"
                                min="1"
                                placeholder="e.g., 8"
                                value={data.estimated_duration}
                                onChange={(e) => setData((prev) => ({ ...prev, [lang]: { ...prev[lang], estimated_duration: e.target.value } }))}
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="description">{Transtext({en:"Course Description", ar:'وصف الدورة', fr:'Description du cours'})}  </Label>
                        <Textarea
                            id="description"
                            placeholder={Transtext({en:"Describe what this course covers and its learning objectives", ar:"صِف ما تغطيه هذه الدورة وأهدافها التعليمية", fr:"Décrivez le contenu de ce cours et ses objectifs d’apprentissage"})}
                            className="mt-4 h-[35vh]"
                            value={data.description}
                            onChange={(e) => setData((prev) => ({ ...prev, [lang]: { ...prev[lang], description: e.target.value } }))}
                        />
                    </div>
                </CardContent>
            </Card>

            {/* <Card className="col-span-2">
                <CardHeader>
                    <CardTitle>Course Settings</CardTitle>
                    <CardDescription>Configure additional course options</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label htmlFor="published">Published</Label>
                            <p className="text-muted-foreground text-sm">Make this course available to learners</p>
                        </div>
                        <Switch
                            id="published"
                            checked={data.published}
                            onCheckedChange={(value) => setData((prev) => ({ ...prev, [lang]: { ...prev[lang], published: value } }))}
                        />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label htmlFor="certificate">Enable Certificate</Label>
                            <p className="text-muted-foreground text-sm">Issue certificates upon course completion</p>
                        </div>
                        <Switch
                            id="certificate"
                            checked={data.enable_certificate}
                            onCheckedChange={(value) => setData((prev) => ({ ...prev, [lang]: { ...prev[lang], enable_certificate: value } }))}
                        />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label htmlFor="discussions">Enable Discussions</Label>
                            <p className="text-muted-foreground text-sm">Allow learners to discuss course content</p>
                        </div>
                        <Switch
                            id="discussions"
                            checked={data.enable_discussions}
                            onCheckedChange={(value) => setData((prev) => ({ ...prev, [lang]: {...prev[lang], enable_discussions: value } }))}
                        />
                    </div>
                </CardContent>
                <div className="mr-3 flex h-full items-end justify-end">
                    <Button
                        onClick={() => {
                            setActiveTab('content');
                        }}
                    >
                        Continue to Content
                        <Check className="ml-2 h-4 w-4" />
                    </Button>
                </div>
            </Card> */}
        </>
    );
};

export default ChapterDetails;
