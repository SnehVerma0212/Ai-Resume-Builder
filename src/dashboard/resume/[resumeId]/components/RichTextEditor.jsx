import { Button } from '@/components/ui/button';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import { Brain, LoaderCircle } from 'lucide-react';
import React, { useContext, useState } from 'react';
import { BtnBold, BtnBulletList, BtnItalic, BtnLink, BtnNumberedList, BtnStrikeThrough, BtnStyles, BtnUnderline, Editor, EditorProvider, HtmlButton, Separator, Toolbar } from 'react-simple-wysiwyg';
import { AIChatSession } from './../../../../../service/AIModal';
import { toast } from 'sonner';

const PROMPT='{positionTitle} , give me 5-7 lines for my experience at my previous work company in resume , give me result in HTML format in paragraph';

function RichTextEditor({onRichTextEditorChange, index, defaultValue}) {
    const [value, setValue] = useState(defaultValue);
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
    const [loading, setLoading] = useState(false);

    const GenerateSummeryFromAI = async () => {
        setLoading(true);

        if (!resumeInfo.Experience[index].title) {
            toast('Please Add Position Title');
            setLoading(false);
            return;
        }

        const prompt = PROMPT.replace('{positionTitle}', resumeInfo.Experience[index].title);

        try {
            const result = await AIChatSession.sendMessage(prompt);

            // Log the entire response object to check its structure
            console.log(result);

            // Check if the response is valid
            if (result && result.response && result.response.text) {
                const resp = result.response.text(); // Assuming this returns text as expected
                setValue(resp.replace('[', '').replace(']', ''));
            } else {
                toast('Error generating summary: Invalid response structure');
            }
        } catch (error) {
            console.error('Error generating summary:', error);
            toast('Error generating summary');
        }

        setLoading(false);
    };

    return (
        <div>
            <div className='flex justify-between my-2'>
                <label className='text-xs'>Summery</label>
                <Button variant="outline" size="sm" 
                    onClick={GenerateSummeryFromAI}
                    className="flex gap-2 border-primary text-primary">
                    {loading ? 
                        <LoaderCircle className='animate-spin'/> :
                        <>
                            <Brain className='h-4 w-4'/> Generate From AI
                        </>
                    }
                </Button>
            </div>
            <EditorProvider>
                <Editor value={value} onChange={(e) => {
                    setValue(e.target.value);
                    onRichTextEditorChange(e);
                }}>
                    <Toolbar>
                        <BtnBold />
                        <BtnItalic />
                        <BtnUnderline />
                        <BtnStrikeThrough />
                        <Separator />
                        <BtnNumberedList />
                        <BtnBulletList />
                        <Separator />
                        <BtnLink />
                    </Toolbar>
                </Editor>
            </EditorProvider>
        </div>
    );
}

export default RichTextEditor;
