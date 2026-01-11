import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button, Input, Card } from './ui';
import { PRIORITY_LEVELS } from '../models';
import useCategories from '../hooks/useCategories';

const TaskForm = ({ task, onSubmit, onCancel, loading = false }) => {
  const { categories } = useCategories();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: PRIORITY_LEVELS.MEDIUM,
    dueDate: '',
    categoryId: '',
  });
  const [errors, setErrors] = useState({});

  // Populate form when editing existing task
  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title || '',
        description: task.description || '',
        priority: task.priority || PRIORITY_LEVELS.MEDIUM,
        dueDate: task.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : '',
        categoryId: task.categoryId || '',
      });
    }
  }, [task]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Task title is required';
    }

    if (formData.dueDate) {
      const selectedDate = new Date(formData.dueDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (selectedDate < today) {
        newErrors.dueDate = 'Due date cannot be in the past';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Convert empty strings to null for optional fields
    const submitData = {
      ...formData,
      description: formData.description.trim() || undefined,
      dueDate: formData.dueDate || undefined,
      categoryId: formData.categoryId || undefined,
    };

    onSubmit(submitData);
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case PRIORITY_LEVELS.HIGH:
        return '#dc3545';
      case PRIORITY_LEVELS.MEDIUM:
        return '#ffc107';
      case PRIORITY_LEVELS.LOW:
        return '#28a745';
      default:
        return '#6c757d';
    }
  };

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '16px' }}>
          <Input
            label="Task Title"
            value={formData.title}
            onChange={(e) => handleInputChange('title', e.target.value)}
            placeholder="Enter task title..."
            error={!!errors.title}
            helperText={errors.title}
            required
          />
        </div>

        <div style={{ marginBottom: '16px' }}>
          <label style={{
            display: 'block',
            marginBottom: '8px',
            fontSize: '14px',
            fontWeight: '500',
            color: '#495057'
          }}>
            Description (Optional)
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            placeholder="Enter task description..."
            rows={3}
            style={{
              width: '100%',
              padding: '10px 12px',
              border: '1px solid #ced4da',
              borderRadius: '4px',
              fontSize: '16px',
              lineHeight: '1.5',
              color: '#495057',
              backgroundColor: '#fff',
              resize: 'vertical',
              fontFamily: 'inherit',
              boxSizing: 'border-box',
            }}
          />
        </div>

        <div style={{ marginBottom: '16px' }}>
          <label style={{
            display: 'block',
            marginBottom: '8px',
            fontSize: '14px',
            fontWeight: '500',
            color: '#495057'
          }}>
            Priority
          </label>
          <select
            value={formData.priority}
            onChange={(e) => handleInputChange('priority', e.target.value)}
            style={{
              width: '100%',
              padding: '10px 12px',
              border: '1px solid #ced4da',
              borderRadius: '4px',
              fontSize: '16px',
              backgroundColor: '#fff',
              color: getPriorityColor(formData.priority),
              fontWeight: '500',
            }}
          >
            <option value={PRIORITY_LEVELS.LOW} style={{ color: '#28a745' }}>
              Low Priority
            </option>
            <option value={PRIORITY_LEVELS.MEDIUM} style={{ color: '#ffc107' }}>
              Medium Priority
            </option>
            <option value={PRIORITY_LEVELS.HIGH} style={{ color: '#dc3545' }}>
              High Priority
            </option>
          </select>
        </div>

        <div style={{ marginBottom: '16px' }}>
          <Input
            label="Due Date (Optional)"
            type="date"
            value={formData.dueDate}
            onChange={(e) => handleInputChange('dueDate', e.target.value)}
            error={!!errors.dueDate}
            helperText={errors.dueDate}
          />
        </div>

        {categories.length > 0 && (
          <div style={{ marginBottom: '24px' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              fontSize: '14px',
              fontWeight: '500',
              color: '#495057'
            }}>
              Category (Optional)
            </label>
            <select
              value={formData.categoryId}
              onChange={(e) => handleInputChange('categoryId', e.target.value)}
              style={{
                width: '100%',
                padding: '10px 12px',
                border: '1px solid #ced4da',
                borderRadius: '4px',
                fontSize: '16px',
                backgroundColor: '#fff',
              }}
            >
              <option value="">No Category</option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        )}

        <div style={{
          display: 'flex',
          gap: '12px',
          justifyContent: 'flex-end'
        }}>
          {onCancel && (
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={loading}
            >
              Cancel
            </Button>
          )}
          <Button
            type="submit"
            variant="primary"
            loading={loading}
          >
            {task ? 'Update Task' : 'Create Task'}
          </Button>
        </div>
      </form>
    </Card>
  );
};

TaskForm.propTypes = {
  task: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func,
  loading: PropTypes.bool,
};

export default TaskForm;