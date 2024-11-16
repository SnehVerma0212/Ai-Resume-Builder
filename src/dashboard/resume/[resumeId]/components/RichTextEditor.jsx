import { Button } from '@/components/ui/button';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import { Brain, LoaderCircle } from 'lucide-react';
import React, { useContext, useState } from 'react';
import { BtnBold, BtnBulletList, BtnItalic, BtnLink, BtnNumberedList, BtnStrikeThrough, BtnUnderline, Editor, EditorProvider, Separator, Toolbar } from 'react-simple-wysiwyg';
import { AIChatSession } from './../../../../../service/AIModal';
import { toast } from 'sonner';

const PROMPT = '{positionTitle}, give me 5-7 lines for my experience at my previous work company in resume. Give me the result in HTML format as a paragraph without unnecessary characters like quotes or colons.';

function RichTextEditor({ onRichTextEditorChange, index }) {
    const [value, setValue] = useState('');
    const { resumeInfo } = useContext(ResumeInfoContext);
    const [loading, setLoading] = useState(false);

    const GenerateSummaryFromAI = async () => {
        setLoading(true);
        const MAX_RETRIES = 3;
        const RETRY_DELAY = 3000; // 3 seconds delay

        if (!resumeInfo.experience[index]?.title) {
            toast('Please add a Position Title before generating the summary.');
            setLoading(false);
            return;
        }

        const prompt = PROMPT.replace('{positionTitle}', resumeInfo.experience[index].title);

        for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
            try {
                const result = await AIChatSession.sendMessage(prompt);
                const respText = await result.response.text();

                // Clean response: remove brackets, quotes, and trim
                const cleanedText = respText
                    .replace(/^\[|\]$/g, '')
                    .replace(/^"|"$/g, '')
                    .trim();

                setValue(cleanedText);
                setLoading(false);
                return; // Exit the function on success
            } catch (error) {
                console.error(`Attempt ${attempt} failed:`, error);

                // Retry logic for 503 errors
                if (error.message.includes('503') && attempt < MAX_RETRIES) {
                    await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY));
                } else {
                    toast('The service is currently overloaded. Please try again later.');
                    break;
                }
            }
        }

        setLoading(false);
    };

    return (
        <div>
            <div className='flex justify-between my-2'>
                <label className='text-xs'>Summary</label>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={GenerateSummaryFromAI}
                    className="flex gap-2 border-primary text-primary"
                >
                    {loading ? (
                        <LoaderCircle className='animate-spin' />
                    ) : (
                        <>
                            <Brain className='h-4 w-4' /> Generate From AI
                        </>
                    )}
                </Button>
            </div>
            <EditorProvider>
                <Editor
                    value={value}
                    onChange={(e) => {
                        setValue(e.target.value);
                        onRichTextEditorChange(e);
                    }}
                >
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
