import React from 'react';
import { Factory } from 'rosie';
import { initializeTestStore, render, screen } from '../setupTest';
import LoadedTabPage from './LoadedTabPage';

jest.mock('../course-header/CourseTabsNavigation', () => () => <div data-testid="CourseTabsNavigation" />);
jest.mock('../instructor-toolbar/InstructorToolbar', () => () => <div data-testid="InstructorToolbar" />);

describe('Loaded Tab Page', () => {
  const mockData = { activeTabSlug: 'dummy' };

  beforeAll(async () => {
    const store = await initializeTestStore({ excludeFetchSequence: true });
    mockData.courseId = store.getState().courseware.courseId;
  });

  it('renders correctly', () => {
    render(<LoadedTabPage {...mockData} />);

    expect(screen.queryByTestId('CourseTabsNavigation')).toBeInTheDocument();
    expect(screen.queryByTestId('InstructorToolbar')).not.toBeInTheDocument();
  });

  it('shows Instructor Toolbar if original user is staff', async () => {
    const courseMetadata = Factory.build('courseMetadata', { original_user_is_staff: true });
    const testStore = await initializeTestStore({ courseMetadata, excludeFetchSequence: true }, false);
    render(<LoadedTabPage {...mockData} courseId={courseMetadata.id} />, { store: testStore });

    expect(screen.getByTestId('InstructorToolbar')).toBeInTheDocument();
  });
});
