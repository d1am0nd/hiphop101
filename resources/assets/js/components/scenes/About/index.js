import React from 'react';

import H1 from '@/components/simple/content/H1';
import H2 from '@/components/simple/content/H2';
import A from '@/components/simple/content/A';
import Description from '@/components/simple/content/Description';

const Faq = () => {
  return (
    <div>
      <H1>About</H1>
      <Description>
        Hip Hop 101 is a platform dedicated to writing quality, positive,
        opinionated introductions to all kinds of hip hop artists, groups
        and associated acts.
      </Description>
      <Description>
        The website is heavily inspired by <A
          title="Hip Hop 101 subreddit"
          href="https://www.reddit.com/r/hiphop101/"
          attributes={{
            target: '_blank',
          }}>
        r/hiphop101</A>.
      </Description>
      <H2>
        <i>If you ain{'\''}t got nothing nice to say, then don{'\''}t
        say nothing</i>
      </H2>
      <Description>
        All reviews should be a generally positive introduction to the artist.
        So if you decide to write your own, which is highly encouraged, please
        write about an artist you deeply care about and can write a nice
        introduction for someone who might want to get into them.
      </Description>
      <H2>Currently in beta</H2>
      <Description>
        The website is currently in beta. If you have any suggestions for
        improvements or would like to help build it, don{`'`}t hesitate to
        send an email to
        {` `}
        <A href="mailto:hiphop101beta@gmail.com">hiphop101beta@gmail.com</A>.
      </Description>
    </div>
  );
};

export default Faq;
