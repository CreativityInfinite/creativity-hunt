import * as React from 'react';
import CategoryPage from '../[key]/page';

export default function AudioVoiceCategoryPage() {
  return <CategoryPage params={Promise.resolve({ key: 'audio-voice' })} />;
}
