import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Briefcase, Clock, MapPin } from 'lucide-react';

const About = () => {
    return (
        <div className='space-y-8'>
            <h1 className='text-2xl font-semibold mb-6'>About</h1>
            <div>
                <p className='text-muted foreground leading-relaxed'>
                    This website gives you a clear and friendly way to keep track of your
                    budget. Browse your transactions, explore your favorite places, and
                    manage your financial overview in one simple space designed to make
                    everyday budgeting feel more organized.
                </p>
            </div>
            <Tabs defaultValue='services'>
                <TabsList variant='line'>
                    <TabsTrigger value='services' className='gap-1.5'>
                        <Briefcase className='h-4 w-4'/>
                        Our Services
                    </TabsTrigger>
                    <TabsTrigger value='history' className='gap-1.5'>
                        <Clock className='h-4 w-4' />
                        History
                    </TabsTrigger>
                    <TabsTrigger value='location' className='gap-1.5'>
                        <MapPin className='h-4 w-4' />
                        Location
                    </TabsTrigger>
                </TabsList>
                <TabsContent value='services'>
                    <Services />
                </TabsContent>
                <TabsContent value='history'>
                    <History />
                </TabsContent>
                <TabsContent value='location'>
                    <Location />
                </TabsContent>
            </Tabs>
        </div>
    )
}

export default About;

export const Services = () => {
  return (
    <>
      <h1 className='text-2xl font-semibold mb-6'>Services</h1>
      <p className='text-muted-foreground leading-relaxed max-w-2xl'>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
        posuere erat a ante venenatis dapibus posuere velit aliquet.
      </p>
    </>
  );
};

export const History = () => {
  return (
    <>
      <h1 className='text-2xl font-semibold mb-6'>History</h1>
      <p className='text-muted-foreground leading-relaxed max-w-2xl'>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras mattis
        consectetur purus sit amet fermentum. Aenean lacinia bibendum nulla sed
        consectetur.
      </p>
    </>
  );
};

export const Location = () => {
  return (
    <>
      <h1 className='text-2xl font-semibold mb-6'>Location</h1>
      <p className='text-muted-foreground leading-relaxed max-w-2xl'>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sed odio
        dui. Maecenas faucibus mollis interdum. Nullam id dolor id nibh
        ultricies vehicula ut id elit.
      </p>
    </>
  );
};