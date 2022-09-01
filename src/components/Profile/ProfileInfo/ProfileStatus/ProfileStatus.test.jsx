import React from 'react';
import { create } from 'react-test-renderer';
import ProfileStatus from './ProfileStatus';

describe('ProfileStatus component', () => {
  test('status from props should be in local state', () => {
    const component = create(<ProfileStatus status="my status" />);
    const instance = component.getInstance();
    expect(instance.state.status).toBe('my status');
  });
  test(`after creation <span> should be displayed with correct status`, () => {
    const component = create(<ProfileStatus status="my status" />);
    const root = component.root;
    let span = root.findByType('span');
    expect(span).not.toBeNull();
  });
  test('after creation <span> should contain the correct status', () => {
    const component = create(<ProfileStatus status="my status" />);
    const root = component.root;
    const span = root.findByType('span');
    expect(span.children[0]).toBe('my status');
  });

  test('input should be displayed in editMode instead of span', () => {
    const component = create(<ProfileStatus status="my status" />);
    const root = component.root;
    const span = root.findByType('span');
    span.props.onDoubleClick();
    const input = root.findByType('input');
    expect(input.props.value).toBe('my status');
  });

  test('callback should be called', () => {
    const mockCallback = jest.fn();
    const component = create(
      <ProfileStatus status="my status" updateStatus={mockCallback} />
    );
    const instance = component.getInstance();
    instance.removeEditMode();
    expect(mockCallback.mock.calls.length).toBe(1);
  });
});
